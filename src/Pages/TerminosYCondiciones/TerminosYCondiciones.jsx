import React from 'react';
import styles from './TerminosYCondiciones.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TerminosYCondiciones = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Términos y Condiciones</h1>
          <button 
            onClick={() => navigate('/dashboard/perfil')} 
            className={styles.backButton}
          >
            Volver al Perfil
          </button>
        </div>
        
        <section className={styles.section}>
          <h2>1. Introducción</h2>
          <p>
            Bienvenido a GymManager. Al acceder y utilizar nuestra plataforma, aceptas estos términos y condiciones en su totalidad.
            Por favor, lee detenidamente este documento antes de utilizar nuestros servicios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Uso del Servicio</h2>
          <p>
            GymManager proporciona una plataforma de gestión para gimnasios que incluye:
          </p>
          <ul>
            <li>Gestión de membresías y usuarios</li>
            <li>Control de acceso y asistencia</li>
            <li>Gestión de inventario y equipamiento</li>
            <li>Programación de clases y eventos</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Privacidad y Protección de Datos</h2>
          <p>
            Nos comprometemos a proteger tu privacidad y datos personales de acuerdo con las leyes y regulaciones aplicables.
            Para más información, consulta nuestra Política de Privacidad.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Responsabilidades del Usuario</h2>
          <p>
            Como usuario de GymManager, te comprometes a:
          </p>
          <ul>
            <li>Proporcionar información precisa y actualizada</li>
            <li>Mantener la confidencialidad de tus credenciales de acceso</li>
            <li>Utilizar el servicio de manera ética y legal</li>
            <li>No realizar actividades que puedan dañar el sistema</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Limitación de Responsabilidad</h2>
          <p>
            GymManager se proporciona "tal cual" y no garantizamos su disponibilidad ininterrumpida.
            No nos hacemos responsables de pérdidas o daños indirectos derivados del uso del servicio.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
            Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Contacto</h2>
          <p>
            Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través de:
          </p>
          <div className={styles.contactInfo}>
            <p>Email: santiagomartinez100@gmail.com</p>
            <p>Teléfono: (+57) 456-7890-343</p>
            <p>Dirección: , cl. 49, caldas, Colombia</p>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default TerminosYCondiciones; 