
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'BuscaNomes | Descubra o Nome Perfeito para seu Bebê',
    description = 'A ferramenta definitiva para encontrar nomes de bebês com significados, origens e curiosidades. Use nossa IA para sugestões personalizadas.',
    image = '/og-image.jpg',
    url = 'https://buscanomes.com'
}) => {
    const fullTitle = title.includes('BuscaNomes') ? title : `${title} | BuscaNomes`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <meta name="theme-color" content="#0f172a" />
        </Helmet>
    );
};

export default SEOHead;
