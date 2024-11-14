export default {
    editor: {
        label: 'Select Search',
        icon: 'select',
        hint: (_, sidepanelContent) => {
            if (sidepanelContent.isInSelect) return null;
            return {
                section: 'style',
                type: 'warning',
                text: 'Select Search must be placed inside a Select element.',
            };
        },
    },
    inherit: {
        type: 'ww-layout',
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    actions: [{ label: 'Focus input', action: 'focusInput' }],
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
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Which properties of the choices are searchable.',
            },
            /* wwEditor:end */
        },
        autoFocus: {
            label: 'Auto focus',
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'boolean' }],
                tooltip: 'Whether the search input should be focused when the dropdown is opened.',
            },
            /* wwEditor:end */
        },
        inputElement: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'deb10a01-5eef-4aa1-9017-1b51c2ad6fd0',
            },
        },
        optionProperties: {
            hidden: true,
            editorOnly: true,
        },
        isInSelect: {
            hidden: true,
            editorOnly: true,
            defaultValue: false,
        },
    },
};
