Ext.define('MultistateButton.view.Main', {

    extend: 'Ext.Panel',

    xtype: 'main',

    requires: [
        'Ext.ux.MultistateButton'
    ],

    config: {
        width: 300,
        height: 300,
        centered: true,
        defaults: {
            xtype: 'container',
            height: 50
        },
        layout: 'vbox',
        items: [
            {
                items: [
                    {
                        xtype: 'multistatebutton',
                        width: 100,
                        docked: 'right',
                        text: 'right',
                        afterText: 'tap me!!',
                        handler: function(){
                            Ext.Msg.alert('right button tap');
                        }
                    }
                ]
            },
            {
                items: [
                    {
                        xtype: 'multistatebutton',
                        docked: 'left',
                        width: 100,
                        text: 'left',
                        afterText: 'tap me!!',
                        handler: function(){
                            Ext.Msg.alert('left button tap');
                        }
                    }
                ]
            }
        ]
    }
});
