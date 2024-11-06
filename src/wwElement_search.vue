<template>
    <div class="ww-select-search" @keydown="handleLocalKeydown">
        <wwElement
            class="ww-select-search"
            ref="searchElementRef"
            v-bind="content.textInput"
            :name="wwElementState.name"
            @element-event="handleInputChange"
            @focus="handleFocus"
            @blur="handleBlur"
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
    emits: ['trigger-event', 'update:sidepanel-content'],
    setup(props, { emit }) {
        const { debounce } = inject('_wwSelectUtils', {});
        const optionProperties = inject('_wwSelectOptionProperties', ref({}));
        const { updateHasSearch, updateSearchElement, updateSearch, updateAutoFocusSearch } = inject(
            '_wwSelectUseSearch',
            {}
        );
        const searchState = inject('_wwSelectSearchState', ref({}));
        const handleKeydown = inject('_wwHandleKeydown', () => {});
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value?.componentRef?.$el);
        const searchBy = computed(() => {
            return (props.content.searchBy || [])
                .filter(item => item && item.filter)
                .map(item => JSON.parse(item.filter.replace(/'/g, '"')))
                .flat();
        });
        const searchValue = computed(() => searchState.value?.value);
        const autoFocus = computed(() => props.content.autoFocus);
        const debouncedUpdateSearch = debounce((value, searchBy) => {
            if (updateSearch) updateSearch({ value, searchBy });
        }, 300);
        const handleInputChange = event => {
            if (event.type === 'change') {
                if (debounce) debouncedUpdateSearch(event.value, searchBy);
            }
        };

        function handleLocalKeydown(event) {
            handleKeydown(event);
            emit('trigger-event', { name: 'onKeydown', event: { value: event } });
        }

        function handleFocus() {
            emit('trigger-event', { name: 'focus', event: null });
        }

        function focusInput() {
            searchElement.value?.focus();
        }

        function handleBlur() {
            emit('trigger-event', { name: 'blur', event: null });
        }

        watch(searchValue, value => {
            emit('trigger-event', { name: 'change', event: { value } });
        });

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
            handleLocalKeydown,
            handleFocus,
            handleBlur,
            focusInput,
        };
    },
};
</script>
