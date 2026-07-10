import SplashCursor from "../ui/SplashCursor";

const CursorMashroom = () => {
    return (
        <SplashCursor
            SPLAT_FORCE={5000}
            SPLAT_RADIUS={0.35}
            DENSITY_DISSIPATION={7}
            RAINBOW_MODE={false}
            COLOR="#534db3"
        />
    );
};

export default CursorMashroom;
