export default {
    editor: {
        label: 'Select Search',
        icon: 'select',
    },
    inherit: {
        type: 'ww-layout',
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    properties: {
        searchBy: {
            label: 'Search by',
            bindable: true,
            type: 'Array',
            options: (_, sidepanelContent) => {
                return {
                    item: {
                        type: 'Object',
                        options: {
                            item: {
                                filter: {
                                    type: 'ObjectPropertyPath',
                                    options: { object: sidepanelContent.optionProperties || {} },
                                    defaultValue: '',
                                },
                            },
                        },
                    },
                };
            },
        },
        textInput: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '9c263ffe-7da7-45e7-832c-543aef56faef',
            },
        },
        optionProperties: {
            hidden: true,
            editorOnly: true,
        },
    },
};
