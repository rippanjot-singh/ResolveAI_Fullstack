import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

/**
 * Theme-aware SkeletonTheme wrapper.
 * Reads the current theme from Redux and adapts skeleton colors accordingly.
 */
export const SkeletonWrapper = ({ children }) => {
    const mode = useSelector(state => state.theme?.mode);
    const isDark = mode === 'dark';

    return (
        <SkeletonTheme
            baseColor={isDark ? '#111113' : '#f4f4f5'}
            highlightColor={isDark ? '#1d1d21' : '#ffffff'}
            borderRadius="4px"
            duration={2}
        >
            {children}
        </SkeletonTheme>
    );
};

export { Skeleton };
