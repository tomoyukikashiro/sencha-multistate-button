
'use strict';

describe('Test for Ext.ux.MultistateButton', function() {

    var msb;

    beforeEach(function() {

        msb = new Ext.ux.touch.MultistateButton();
    });

    afterEach(function() {
        msb = null;
    });

    describe('addUnit', function() {

        var unit;
        it('add css unit (px) if parameter is Number', function() {

            unit = msb.addUnit(10);
            expect(unit).toEqual('10px');
        });

        it('do not add  css unit if parameter is not Number', function() {

            unit = msb.addUnit('10%');
            expect(unit).toEqual('10%');
        });
    });

    describe('modifyWidth', function() {

        it('do not set width if parameter is not passed', function() {

            var dom = msb.element.dom,
                width = dom.style.width;
            msb.modifyWidth();

            expect(dom.style.width).toEqual(width);
        });

        it('set width if parameter is passed', function() {

            var dom = msb.element.dom;
            msb.modifyWidth('10%');

            expect(dom.style.width).toEqual('10%');
        });
    });

    describe('removeTapEvent', function() {

        it('onTap function is not called', function() {

            sinon.spy(msb, 'onTap');
            msb.removeTapEvent();
            msb.element.fireEvent('tap');

            expect(msb.onTap).not.toHaveBeenCalled();
            msb.onTap.reset();
        });
    });

    describe('addTapMultistateBntEvent', function() {

        it('onTapMultiBtn function is called', function() {

            // addTapMultistateBntEvent is called when component is initialized
            sinon.spy(msb, 'onTapMultiBtn');
            msb.element.fireEvent('tap');

            expect(msb.onTapMultiBtn).toHaveBeenCalled();
            msb.onTapMultiBtn.reset();
        });
    });

    describe('isFirstState', function() {

        it('return true when state is first', function() {

            msb.setStateName('first');
            expect(msb.isFirstState()).toBeTruthy();
        });

        it('return false when state is second', function() {

            msb.setStateName('second');
            expect(msb.isFirstState()).toBeFalsy();
        });
    });

    describe('changeState', function() {

        it('change to second state when state is first', function() {

            msb.setStateName('first');
            msb.changeState();
            expect(msb.setStateName()).toBeTruthy('second');
        });

        it('change to first state when state is second', function() {

            msb.setStateName('second');
            msb.changeState();
            expect(msb.setStateName()).toBeTruthy('first');
        });
    });

    describe('onTapMultiBtn', function() {

        it('doFstState function is not called when state is second', function() {

            sinon.spy(msb, 'doFstState');

            msb.setStateName('second');
            msb.onTapMultiBtn();

            expect(msb.doFstState).not.toHaveBeenCalled();
            msb.doFstState.reset();
        });

        it('doFstState function is called when state is first', function() {

            sinon.spy(msb, 'doFstState');

            msb.setStateName('first');
            msb.onTapMultiBtn();

            expect(msb.doFstState).toHaveBeenCalled();
            msb.doFstState.reset();
        });
    });

    describe('doFstState', function() {

        it('set add afterCls and afterTxt propeties and call doAnimation', function() {

            var afterCls = msb.getAfterCls(),
                afterText = msb.getAfterText();

            sinon.spy(msb, 'doAnimation');

            msb.doFstState();

            expect(msb.getCls()).toContain(afterCls);
            expect(msb.getText()).toEqual(afterText);
            expect(msb.doAnimation).toHaveBeenCalled();

            msb.doAnimation.reset();
        });
    });

    describe('cancel', function() {

        it('set add afterCls and afterTxt propeties and call doAnimation', function() {

            var afterCls = msb.getAfterCls(),
                text = msb.getText();

            sinon.spy(msb, 'doAnimation');

            msb.cancel();

            expect(msb.getCls()).not.toContain(afterCls);
            expect(msb.getText()).toEqual(text);
            expect(msb.doAnimation).toHaveBeenCalled();

            msb.doAnimation.reset();
        });
    });

    describe('doAfterAnimation', function() {

        it('call addTapEvent when state is first', function() {

            sinon.spy(msb, 'addTapEvent');
            sinon.spy(msb, 'changeState');

            msb.setStateName('first');
            msb.doAfterAnimation();

            expect(msb.addTapEvent).toHaveBeenCalled();
            expect(msb.changeState).toHaveBeenCalled();

            msb.addTapEvent.reset();
            msb.changeState.reset();
        });

        it('call removeTapEvent when state is second', function() {

            sinon.spy(msb, 'removeTapEvent');
            sinon.spy(msb, 'changeState');

            msb.setStateName('second');
            msb.doAfterAnimation();

            expect(msb.removeTapEvent).toHaveBeenCalled();
            expect(msb.changeState).toHaveBeenCalled();

            msb.removeTapEvent.reset();
            msb.changeState.reset();
        });
    });
});
