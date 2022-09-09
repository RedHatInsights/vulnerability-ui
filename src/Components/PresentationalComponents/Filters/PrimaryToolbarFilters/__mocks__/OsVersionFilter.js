export default () => [
    {
        label: 'Operating System',
        type: 'group',
        id: 'rhel_version',
        value: 'os-filter',
        placeholder: 'Filter by operating system',
        filterValues: {
            selected: {},
            groups: [
                {
                    groupSelectable: true,
                    noFilter: true,
                    label: 'RHEL 9',
                    value: '9.0',
                    items: [
                        {
                            label: 'RHEL 9.0',
                            value: '9.0',
                            type: 'checkbox'
                        }
                    ]
                },
                {
                    groupSelectable: true,
                    noFilter: true,
                    label: 'RHEL 8',
                    value: '8.0',
                    items: [
                        {
                            label: 'RHEL 8.6',
                            value: '8.6',
                            type: 'checkbox'
                        },
                        {
                            label: 'RHEL 8.5',
                            value: '8.5',
                            type: 'checkbox'
                        },
                        {
                            label: 'RHEL 8.0',
                            value: '8.0',
                            type: 'checkbox'
                        }
                    ]
                },
                {
                    groupSelectable: true,
                    noFilter: true,
                    label: 'RHEL 6',
                    value: '6.0',
                    items: [
                        {
                            label: 'RHEL 6.7',
                            value: '6.7',
                            type: 'checkbox'
                        }
                    ]
                }
            ]
        }
    }
];
