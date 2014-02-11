/**
 * @class Ext.ux.touch.MultistateButton
 * @extends Ext.Button
 * This is custom component which is multi-state button for sencha touch like install buttom in iPhone app store.
 * @version 0.1.3
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */
'use strict';
Ext.define('Ext.ux.touch.MultistateButton', {

    extend: 'Ext.Button',

    xtype: 'multistatebutton',

    requires: [
        'Ext.Anim'
    ],

    config: {

        cls: 'multistate-button',

        /**
         * duration of animation from first state to second state.
         * @type {Number}
         */
        duration: 250,

        /**
         * width of second state.
         * @type {Number}
         */
        afterWidth: 200,

        /**
         * css class which is added when button is changed to second state.
         * @type {String}
         */
        afterCls: 'msb-after',

        /**
         * text which is changed when button is changed to second state.
         * @type {String}
         */
        afterText: null,

        stateName: 'first',
        stateAnim: null

    },

    // orverride to remove tap event
    initialize: function(){
        var me = this;

        //me.callParent();

        me.modifyWidth(me.getWidth());

        me.removeTapEvent();

        me.addTapMultistateBntEvent();
    },

    /**
     * Whether button is first state or not.
     * @return {Boolean} when the button is first state, true is returned.
     */
    isFirstState: function(){
        var me = this;
        return (me.getStateName() === 'first');
    },

    /**
     * change state flag
     */
    changeState: function(){
        var me = this;

        if(me.isFirstState()){
            me.setStateName('second');
        }else{
            me.setStateName('first');
        }
    },

    /**
     * add unit to css property
     * @param {String|Number} value css width value.
     * if the value is Number, added 'px' unit.
     * return {String} add unit to argument number.
     */
    addUnit: function(value){
        var defaultUnit = 'px',
            isNumber = Ext.isNumber(value);

        if(isNumber){
            value += defaultUnit;
        }

        return value;
    },

    /**
     * remove '!important' from width css property
     * @param {Number} width css width value.
     */
    modifyWidth: function(width){
        var me = this;

        if(!width){
            return;
        }

        width = me.addUnit(width);

        // reset width
        me.setStyle({'width': ''});
        me.element.dom.style.width = width;
    },

    /**
     * call when tap button in first state
     */
    onTapMultiBtn: function(){
        var me = this;

        if(me.isFirstState()){
            // call only first state
            me.doFstState();
        }
    },

    /**
     * execute when called for the first time.
     * animate button style and change button to second state.
     */
    doFstState: function(){

        var me = this,
            cls = me.getAfterCls(),
            text = me.getAfterText();

        me.addCls(cls);
        me.setText(text);

        me.doAnimation();

    },

    /**
     * back to first state.
     */
    cancel: function(){
        var me = this,
            cls = me.getAfterCls(),
            text = me.getText();

        me.removeCls(cls);
        me.setText(text);

        me.doAnimation();
    },

    /**
     * animate button to change button state
     */
    doAnimation: function(){

        var me = this,
            isFirstState = me.isFirstState(),
            stateAnim = me.createAnim();

        stateAnim.run(me.element, {
            isFirstState: isFirstState,
            after: function(){
                me.doAfterAnimation.apply(me);
            }
        });

    },

    /**
     * get Ext.Anim instance
     */
    createAnim: function(){

        var me = this,
            width = me.getWidth(),
            afterWidth = me.getAfterWidth(),
            stateAnim = me.getStateAnim();

        if(stateAnim){
            return stateAnim;
        }

        width = me.addUnit(width);
        afterWidth = me.addUnit(afterWidth);

        stateAnim = new Ext.Anim({
            isFirstState : true,
            duration : me.getDuration(),
            autoClear: false,

            before : function() {
                var me = this,
                    isFirstState = me.isFirstState,
                    toW, fromW;

                if (isFirstState) {
                    toW = afterWidth;
                    fromW = width;
                }else{
                    toW = width;
                    fromW = afterWidth;
                }

                // アニメーション
                me.from = {
                    'width': fromW
                };
                me.to = {
                    'width': toW
                };
            }
        });

        me.setStateAnim(stateAnim);
        return stateAnim;
    },

    /**
     * call when state animation have finished.
     */
    doAfterAnimation: function(){
        var me = this;

        if(me.isFirstState()){
            // when first state
            me.addTapEvent();
        }else{
            // when second state
            me.removeTapEvent();
        }
        me.changeState();
    },

    /**
     * add tap event
     */
    addTapEvent: function(){
        var me = this;

        me.element.on({
            scope: me,
            tap  : 'onTap'
        });
    },

    /**
     * remove tap event
     */
    removeTapEvent: function(){
        var me = this;

        me.element.un({
            scope: me,
            tap : 'onTap'
        });
    },

    /**
     * add multistateBtn tap event
     */
    addTapMultistateBntEvent: function() {
        var me = this;

        me.element.on({
            scope: me,
            tap  : 'onTapMultiBtn'
        });
    }
});
