<template>
    <div class="ww-select-search">
        <wwElement
            ref="searchElementRef"
            v-bind="content.textInput"
            :name="wwElementState.name"
            @element-event="handleInputChange"
        />
    </div>
</template>

<script>
import { inject, onBeforeUnmount, ref, computed, watch } from 'vue';

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['update:content'],
    setup(props, { emit }) {
        const updateSearch = inject('_wwSelectUpdateSearch', () => {});
        const optionProperties = inject('_wwSelectOptionProperties', ref({}));
        const { updateHasSearch, updateSearchElement } = inject('_wwSelectUseSearch', {});
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value?.componentRef?.$el);
        const searchBy = computed(() => {
            return (props.content.searchBy || [])
                .filter(item => item && item.filter)
                .map(item => JSON.parse(item.filter.replace(/'/g, '"')))
                .flat();
        });

        watch(searchElement, value => {
            if (updateSearchElement) updateSearchElement(value);
        });

        watch(
            optionProperties,
            value => {
                emit('update:sidepanel-content', {
                    path: 'optionProperties',
                    value: value,
                });
            },
            { immediate: true, deep: true }
        );

        const debouncedUpdateSearch = debounce((value, searchBy) => {
            if (updateSearch) updateSearch({ value, searchBy });
        }, 300);

        const handleInputChange = event => {
            if (event.type === 'change') {
                debouncedUpdateSearch(event.value, searchBy);
            }
        };

        if (updateHasSearch) updateHasSearch(true);
        onBeforeUnmount(() => {
            if (updateHasSearch) updateHasSearch(false);
        });

        return {
            searchElementRef,
            handleInputChange,
        };
    },
};
</script>
