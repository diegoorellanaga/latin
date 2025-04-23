export default function ApplicationLogo(props) {
    return (
        <img 
            src={`${process.env.PUBLIC_URL}/images/latin.png`} 
            alt="Application Logo" 
            {...props}
        />
    );
}
