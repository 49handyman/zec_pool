const setRemUnit = () => {
    const docEl = document.documentElement;
    const rem = docEl.clientWidth / 3.75;
    
    docEl.style.fontSize = `${rem}px`;
    };
    
    const pageShowCallback = (e) => {
    if (e.persisted) {
    setRemUnit();
    }
    };
    
    document.addEventListener('DOMContentLoaded', setRemUnit, false);
    
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit, false);
    
    // reset rem unit on page show
    window.addEventListener('pageshow', pageShowCallback, false);
    
    export default setRemUnit;
     