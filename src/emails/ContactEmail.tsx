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

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactEmail = ({
    name = 'Usuario',
    email = 'usuario@ejemplo.com',
    message = 'Este es un mensaje de prueba.',
}: ContactEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Nuevo mensaje de contacto de {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header con gradiente */}
                    <Section style={header}>
                        <Heading style={h1}>💼 Nuevo Mensaje de Contacto</Heading>
                    </Section>

                    {/* Contenido principal */}
                    <Section style={content}>
                        {/* Información del remitente */}
                        <Section style={infoBox}>
                            <Text style={infoLabel}>👤 Nombre</Text>
                            <Text style={infoValue}>{name}</Text>
                        </Section>

                        <Section style={infoBox}>
                            <Text style={infoLabel}>📧 Email</Text>
                            <Link href={`mailto:${email}`} style={emailLink}>
                                {email}
                            </Link>
                        </Section>

                        <Hr style={divider} />

                        {/* Mensaje */}
                        <Section style={messageSection}>
                            <Text style={messageLabel}>💬 Mensaje</Text>
                            <Section style={messageBox}>
                                <Text style={messageText}>{message}</Text>
                            </Section>
                        </Section>

                        {/* Botón de respuesta rápida */}
                        <Section style={buttonContainer}>
                            <Link href={`mailto:${email}`} style={button}>
                                Responder a {name}
                            </Link>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={footerDivider} />
                        <Text style={footerText}>
                            Este mensaje fue enviado desde tu portafolio web
                        </Text>
                        <Text style={footerSubtext}>
                            Recibido el {new Date().toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ContactEmail;

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

const infoBox = {
    marginBottom: '24px',
};

const infoLabel = {
    color: '#71717A',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 8px 0',
};

const infoValue = {
    color: '#18181B',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0',
    lineHeight: '1.5',
};

const emailLink = {
    color: '#2DD4BF',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'inline-block',
};

const divider = {
    borderColor: '#E4E4E7',
    margin: '32px 0',
};

const messageSection = {
    marginTop: '32px',
};

const messageLabel = {
    color: '#71717A',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 16px 0',
};

const messageBox = {
    backgroundColor: '#F4F4F5',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #E4E4E7',
};

const messageText = {
    color: '#18181B',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
};

const buttonContainer = {
    textAlign: 'center' as const,
    marginTop: '40px',
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
    transition: 'background-color 0.2s',
};

const footer = {
    padding: '0 30px 40px',
};

const footerDivider = {
    borderColor: '#E4E4E7',
    margin: '0 0 24px 0',
};

const footerText = {
    color: '#71717A',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: '0 0 8px 0',
    textAlign: 'center' as const,
};

const footerSubtext = {
    color: '#A1A1AA',
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '0',
    textAlign: 'center' as const,
};
