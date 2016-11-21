package movilway.view.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.jboss.logging.Logger;

import security.dao.exception.InfraestructureException;
import security.dao.util.HibernateUtil;
 
@WebListener
public class HibernateSessionFactoryListenerSecurity implements ServletContextListener {
 
    public final Logger logger = Logger.getLogger(HibernateSessionFactoryListenerSecurity.class);
     
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        SessionFactory sessionFactory = (SessionFactory) servletContextEvent.getServletContext().getAttribute("SessionFactory");
        if(sessionFactory != null && !sessionFactory.isClosed()){
            logger.info("Closing sessionFactory-SEGURITY");
            sessionFactory.close();
        }
        logger.info("Released Hibernate sessionFactory resource-SEGURITY");
    }
 
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        SessionFactory sessionFactory = null;
		try {
			Configuration configuration = new Configuration();
			configuration.configure("hibernate.cfg.xml");
			logger.info("Hibernate Configuration created successfully-SEGURITY");
			 
			ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
			logger.info("ServiceRegistry created successfully-SEGURITY");
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);
			logger.info("SessionFactory created successfully-SEGURITY");
			 
			servletContextEvent.getServletContext().setAttribute("SessionFactory", sessionFactory);
			logger.info("Hibernate SessionFactory Configured successfully-SEGURITY");
			
			 try {
					HibernateUtil.getSessionFactory(sessionFactory);
				} catch (InfraestructureException e) {
					e.printStackTrace();
				}
		} catch (HibernateException e1) {
			e1.printStackTrace();
		}
        
       

    }
     
}