<template>
    <div class="ww-select-search" @keydown="handleKeydown">
        <wwElement
            class="ww-select-search"
            ref="searchElementRef"
            v-bind="content.textInput"
            :name="wwElementState.name"
            @element-event="handleInputChange"
        />
    </div>
</template>

<script>
import { inject, onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['update:sidepanel-content'],
    setup(props, { emit }) {
        const { debounce } = inject('_wwUtils', {});
        const optionProperties = inject('_wwSelectOptionProperties', ref({}));
        const { updateHasSearch, updateSearchElement, updateSearch, updateAutoFocusSearch } = inject(
            '_wwSelectUseSearch',
            {}
        );
        const handleKeydown = inject('_wwHandleKeydown', () => {});
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value?.componentRef?.$el);
        const searchBy = computed(() => {
            return (props.content.searchBy || [])
                .filter(item => item && item.filter)
                .map(item => JSON.parse(item.filter.replace(/'/g, '"')))
                .flat();
        });
        const autoFocus = computed(() => props.content.autoFocus);
        const debouncedUpdateSearch = debounce((value, searchBy) => {
            if (updateSearch) updateSearch({ value, searchBy });
        }, 300);
        const handleInputChange = event => {
            if (event.type === 'change') {
                if (debounce) debouncedUpdateSearch(event.value, searchBy);
            }
        };
        watch(searchElement, value => {
            if (updateSearchElement) updateSearchElement(value);
        });
        watch(
            optionProperties,
            value => {
                emit('update:sidepanel-content', { path: 'optionProperties', value });
            },
            { immediate: true, deep: true }
        );
        watch(autoFocus, value => {
            if (updateAutoFocusSearch) updateAutoFocusSearch(value);
        });
        onMounted(() => {
            if (updateHasSearch) updateHasSearch(true);
            if (updateSearch) updateSearch({ value: '', searchBy, searchMatches: [] });
        });
        onBeforeUnmount(() => {
            if (updateHasSearch) updateHasSearch(false);
        });

        return {
            searchElementRef,
            handleInputChange,
            handleKeydown,
        };
    },
};
</script>
