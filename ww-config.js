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
    actions: [{ label: 'Focus element', action: 'focusInput' }],
    triggerEvents: [
        { name: 'change', label: { en: 'On search change' }, event: { value: '' }, default: true },
        {
            name: 'onKeydown',
            label: { en: 'On keydown' },
            event: {
                isTrusted: undefined,
                _vts: undefined,
                altKey: false,
                bubbles: undefined,
                cancelBubble: undefined,
                cancelable: undefined,
                charCode: 0,
                code: '',
                composed: undefined,
                ctrlKey: false,
                currentTarget: null,
                defaultPrevented: undefined,
                detail: 0,
                eventPhase: 0,
                isComposing: undefined,
                key: '',
                keyCode: undefined,
                location: 0,
                metaKey: false,
                repeat: undefined,
                returnValue: undefined,
                shiftKey: false,
                sourceCapabilities: {
                    firesTouchEvents: undefined,
                },
                srcElement: null,
                target: null,
                timeStamp: undefined,
                type: '',
                view: null,
                which: undefined,
            },
        },
        { name: 'focus', label: { en: 'On focus' }, event: null },
        { name: 'blur', label: { en: 'On blur' }, event: null },
    ],
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
        autoFocus: {
            label: 'Auto focus',
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [{ type: 'boolean' }],
                tooltip: 'Auto focus the search input when the component is mounted.',
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
        optionProperties: {
            hidden: true,
            editorOnly: true,
        },
    },
};
