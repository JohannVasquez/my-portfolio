import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
    Link,
} from '@react-email/components';
import * as React from 'react';

interface ConfirmationEmailProps {
    name: string;
}

export const ConfirmationEmail = ({
    name = 'Usuario',
}: ConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>¡Gracias por contactarme, {name}!</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header con gradiente */}
                    <Section style={header}>
                        <Heading style={h1}>✨ ¡Mensaje Recibido!</Heading>
                    </Section>

                    {/* Contenido principal */}
                    <Section style={content}>
                        <Text style={greeting}>
                            ¡Hola <strong>{name}</strong>! 👋
                        </Text>

                        <Text style={paragraph}>
                            Gracias por ponerte en contacto conmigo a través de mi portafolio.
                            He recibido tu mensaje correctamente y lo revisaré lo antes posible.
                        </Text>

                        <Section style={highlightBox}>
                            <Text style={highlightText}>
                                📬 Generalmente respondo dentro de las próximas <strong>24-48 horas</strong>.
                            </Text>
                        </Section>

                        <Text style={paragraph}>
                            Mientras tanto, te invito a explorar más sobre mi trabajo y proyectos
                            en mi portafolio web.
                        </Text>

                        {/* Botón para visitar el portafolio */}
                        <Section style={buttonContainer}>
                            <Link href="https://jvdev.cl" style={button}>
                                Visitar mi Portafolio
                            </Link>
                        </Section>

                        <Hr style={divider} />

                        {/* Redes sociales */}
                        <Section style={socialSection}>
                            <Text style={socialLabel}>También puedes encontrarme en:</Text>
                            <Section style={socialLinks}>
                                <Link href="https://github.com/JohannVasquez" style={socialLink}>
                                    GitHub
                                </Link>
                                <Text style={socialSeparator}>•</Text>
                                <Link href="https://www.linkedin.com/in/johann-vasquez-bello/" style={socialLink}>
                                    LinkedIn
                                </Link>
                            </Section>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={footerDivider} />
                        <Text style={signature}>
                            ¡Saludos!
                        </Text>
                        <Text style={signatureName}>
                            Johann Vásquez
                        </Text>
                        <Text style={signatureTitle}>
                            Software Engineer
                        </Text>
                        <Text style={footerSubtext}>
                            Este es un correo automático de confirmación.
                            Por favor, no respondas directamente a este mensaje.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ConfirmationEmail;

// Estilos
const main = {
    backgroundColor: '#0F1115',
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
    padding: '20px 0',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '600px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const header = {
    background: 'linear-gradient(135deg, #2DD4BF 0%, #5EEAD4 100%)',
    padding: '40px 30px',
    textAlign: 'center' as const,
};

const h1 = {
    color: '#0F1115',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0',
    lineHeight: '1.2',
};

const content = {
    padding: '40px 30px',
};

const greeting = {
    color: '#18181B',
    fontSize: '20px',
    lineHeight: '1.5',
    margin: '0 0 24px 0',
};

const paragraph = {
    color: '#3F3F46',
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 20px 0',
};

const highlightBox = {
    backgroundColor: '#F0FDFA',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #5EEAD4',
    margin: '24px 0',
};

const highlightText = {
    color: '#0F766E',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0',
    textAlign: 'center' as const,
};

const buttonContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
    marginBottom: '32px',
};

const button = {
    backgroundColor: '#2DD4BF',
    borderRadius: '8px',
    color: '#0F1115',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '14px 32px',
};

const divider = {
    borderColor: '#E4E4E7',
    margin: '32px 0',
};

const socialSection = {
    textAlign: 'center' as const,
};

const socialLabel = {
    color: '#71717A',
    fontSize: '14px',
    margin: '0 0 12px 0',
};

const socialLinks = {
    textAlign: 'center' as const,
};

const socialLink = {
    color: '#2DD4BF',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'inline',
};

const socialSeparator = {
    color: '#D4D4D8',
    fontSize: '14px',
    margin: '0 12px',
    display: 'inline',
};

const footer = {
    padding: '0 30px 40px',
    textAlign: 'center' as const,
};

const footerDivider = {
    borderColor: '#E4E4E7',
    margin: '0 0 24px 0',
};

const signature = {
    color: '#18181B',
    fontSize: '16px',
    margin: '0 0 4px 0',
};

const signatureName = {
    color: '#2DD4BF',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px 0',
};

const signatureTitle = {
    color: '#71717A',
    fontSize: '14px',
    margin: '0 0 24px 0',
};

const footerSubtext = {
    color: '#A1A1AA',
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '0',
};
