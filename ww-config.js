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
            type: 'TextSelect',
            options: {
                options: [
                    {
                        value: 'value',
                        label: 'Value',
                    },
                    {
                        value: 'label',
                        label: 'Label',
                    },
                ],
            },
            bindable: true,
            defaultValue: 'single',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string value, either "value" or "label"',
            },
            /* wwEditor:end */
        },
        textInput: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: '9c263ffe-7da7-45e7-832c-543aef56faef',
            },
        },
    },
};
