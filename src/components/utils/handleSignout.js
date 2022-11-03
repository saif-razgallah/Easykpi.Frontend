const handleSignout = () => {
    sessionStorage.clear()
    window.location="/"
};

export default handleSignout;
