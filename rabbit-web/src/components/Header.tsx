type HeaderProps = {
    image: {
        src: string;
        alt: string;
    };
    children: React.ReactNode;
};

// NOTE
// <img src={image.src} alt={image.alt} />
// <img {...image} />
export default function Header({ image, children } : HeaderProps) {
    return (
        <header>
            <img {...image} />
            {children}
        </header>
    );
}