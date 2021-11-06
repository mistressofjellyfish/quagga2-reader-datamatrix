(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@zxing/library')) :
    typeof define === 'function' && define.amd ? define(['@zxing/library'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Quagga2DatamatrixReader = factory(global.library));
}(this, (function (library) { 'use strict';

    /* eslint-disable no-underscore-dangle */
    class DatamatrixReader {
        constructor(config, supplements) {
            this._row = [];
            this.config = config || {};
            this.supplements = supplements;
            this.FORMAT = {
                value: 'datamatrix',
                writeable: false,
            };
            const hints = new Map();
            const formats = [library.BarcodeFormat.DATA_MATRIX];
            hints.set(library.DecodeHintType.POSSIBLE_FORMATS, formats);
            this.reader = new library.MultiFormatReader();
            this.reader.setHints(hints);
            return this;
        }
        decodeImage(inputImageWrapper) {
            const data = inputImageWrapper.getAsRGBA();
            const lSource = new library.RGBLuminanceSource(data, inputImageWrapper.size.x, inputImageWrapper.size.y);
            const binaryBitmap = new library.BinaryBitmap(new library.HybridBinarizer(lSource));
            var result = this.reader.decode(binaryBitmap);
            // TODO: translate result.location into same values as box/boxes from other readers?
            return Object.assign({ codeResult: {
                    code: result.getText(),
                    format: this.FORMAT.value,
                } }, result);
        }
        // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
        decodePattern(pattern) {
            // STUB, this is probably meaningless to QR, but needs to be implemented for Quagga, in case
            // it thinks there's a potential barcode in the image
            return null;
        }
    }

    return DatamatrixReader;

})));
