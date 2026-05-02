import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

/**
 * Theme-aware SkeletonTheme wrapper.
 * Reads the current theme from Redux and adapts skeleton colors accordingly.
 */
export const SkeletonWrapper = ({ children }) => {
    const isDark = useSelector(state => state.theme?.isDark);

    return (
        <SkeletonTheme
            baseColor={isDark ? '#27272a' : '#e4e4e7'}
            highlightColor={isDark ? '#3f3f46' : '#f4f4f5'}
            borderRadius="4px"
        >
            {children}
        </SkeletonTheme>
    );
};

export { Skeleton };
