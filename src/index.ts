/* eslint-disable no-underscore-dangle */
// Quagga may have a dependency on the name of the property _row
import { MultiFormatReader, BarcodeFormat, RGBLuminanceSource, BinaryBitmap, HybridBinarizer, DecodeHintType } from '@zxing/library';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ImageWrapper } from '@ericblade/quagga2';

class DatamatrixReader {
    // TODO: is FORMAT, _row, config, supplements actually necessary? check inside quagga to see if
    // they are used for anything? or if they are just customary.
    FORMAT: {
        value: 'datamatrix',
        writeable: false,
    };

    _row: [];

    config: {};

    supplements: any;

    reader: MultiFormatReader;

    constructor(config: {}, supplements: any) {
        this._row = [];
        this.config = config || {};
        this.supplements = supplements;
        this.FORMAT = {
            value: 'datamatrix',
            writeable: false,
        };
        const hints = new Map();
        const formats = [BarcodeFormat.DATA_MATRIX];
        hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
        this.reader = new MultiFormatReader();
        this.reader.setHints(hints);
        return this;
    }

    decodeImage(inputImageWrapper: ImageWrapper) {
        
        const data = inputImageWrapper.getAsRGBA();
        const lSource = new RGBLuminanceSource(data, inputImageWrapper.size.x, inputImageWrapper.size.y);
        const binaryBitmap = new BinaryBitmap(new HybridBinarizer(lSource));

        try {
            var result = this.reader.decode(binaryBitmap);
        }
        catch(e)
        {
            return null;
        }

        // TODO: translate result.location into same values as box/boxes from other readers?
        return {
            codeResult: {
                code: result.getText(),
                format: this.FORMAT.value,
            },
            ...result,
        };
    }

    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
    decodePattern(pattern: any) {
        // STUB, this is probably meaningless to QR, but needs to be implemented for Quagga, in case
        // it thinks there's a potential barcode in the image
        return null;
    }
}

export default DatamatrixReader;
