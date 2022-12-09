import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { usePrimaryTerm } from '../../hooks';

export const PostPrimaryTerm = (props) => {
	const {
		context,
		taxonomyName = 'category',
		placeholder = __('Select a term', 'tenup'),
		isLink = true,
		...rest
	} = props;

	const [primaryTerm, isSupportedTaxonomy] = usePrimaryTerm(taxonomyName, context);

	const hasPrimaryTerm = !!primaryTerm;

	const termString = hasPrimaryTerm ? primaryTerm.name : placeholder;
	const termUrl = hasPrimaryTerm ? primaryTerm.link : '#';

	if (!isSupportedTaxonomy) {
		return null;
	}

	const Tag = isLink ? 'a' : 'span';

	const wrapperProps = {
		...rest,
	};

	if (isLink) {
		wrapperProps.href = termUrl;
	}

	return <Tag {...wrapperProps}>{termString}</Tag>;
};

PostPrimaryTerm.propTypes = {
	context: PropTypes.object,
	placeholder: PropTypes.string,
	taxonomyName: PropTypes.string.isRequired,
	isLink: PropTypes.bool,
};

PostPrimaryTerm.defaultProps = {
	context: {},
	placeholder: __('Select a Term', 'tenup'),
	isLink: true,
};