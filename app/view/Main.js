Ext.define('MultistateButton.view.Main', {

    extend: 'Ext.Panel',

    xtype: 'main',

    cls: 'msb-main',

    requires: [
        'Ext.ux.touch.MultistateButton'
    ],

    config: {
        defaults: {
            xtype: 'container',
            height: 100
        },
        layout: 'vbox',
        items: [
            {
                items: [
                    {
                        xtype: 'container',
                        cls: 'title',
                        html: '<h1>Multi-state Button</h1>'
                    },
                    {
                        xtype: 'multistatebutton',
                        width: 100,
                        height: 50,
                        text: 'Buy now',
                        afterText: 'Install',
                        handler: function(){
                            Ext.Msg.alert('Thank you');
                        }
                    }
                ]
            }
        ]
    }
});
