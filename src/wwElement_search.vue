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
    setup(props) {
        const updateFilter = inject('_wwSelectUpdateFilter', () => {});
        const { updateHasSearch, updateSearchElement } = inject('_wwSelectUseSearch', {});
        const searchElementRef = ref(null);
        const searchElement = computed(() => searchElementRef.value?.componentRef?.$el);

        watch(searchElement, value => {
            if (updateSearchElement) updateSearchElement(value);
        });

        const debouncedUpdateFilter = debounce((value, filterBy) => {
            if (updateFilter) updateFilter({ value, filterBy });
        }, 300);

        const handleInputChange = event => {
            if (event.type === 'change') {
                debouncedUpdateFilter(event.value, props.content.searchBy);
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
