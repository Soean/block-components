import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { Icon as CoreIcon, search, edit, cloud, starFilled } from '@wordpress/icons';
import { renderToString } from '@wordpress/element';

import {
    IconPicker,
    Icon,
    IconPickerToolbarButton,
    InlineIconPicker,
    IconPickerSelectControl,
    registerIcons,
} from '@10up/block-components';

const NAMESPACE = 'example';

registerIcons({
    name: 'example/theme',
    label: "Example",
    icons: [
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled",
            label: "Star Filled"
        },
    ]
});

registerBlockType( `${ NAMESPACE }/icon-picker-example`, {
    title: __( 'Icon Picker Example', NAMESPACE ),
    description: __( 'Example Block to show the Icon Picker in usage', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {
        icon: {
            type: 'object',
            default: {}
        }
    },
    transforms: {},
    variations: [],
    edit: (props) => {
        const {
            attributes,
            setAttributes
        } = props;

        const { icon } = attributes;

        const blockProps = useBlockProps();

        const IconPreview = () => icon?.name ? <Icon name={icon?.name} iconSet={icon?.iconSet} /> : null;
        return (
            <div {...blockProps}>
                <h2><IconPreview />Hello World!</h2>
                <IconPicker value={icon} onChange={ value => setAttributes({icon: { name: value.name, iconSet: value.iconSet }}) } />
            </div>
        )
    },
    save: () => null
} );
