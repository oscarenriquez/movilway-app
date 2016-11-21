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

import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.HibernateUtil;

@WebListener
public class HibernateSessionFactoryListenerMovilway implements ServletContextListener {

	public final Logger logger = Logger.getLogger(HibernateSessionFactoryListenerMovilway.class);

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		SessionFactory sessionFactory = (SessionFactory) servletContextEvent.getServletContext().getAttribute("SessionFactory");
		if ((sessionFactory != null) && !sessionFactory.isClosed()) {
			logger.info("Closing sessionFactory-Movilway");
			sessionFactory.close();
		}
		logger.info("Released Hibernate sessionFactory resource-Movilway");
	}

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		SessionFactory sessionFactory = null;
		try {
			Configuration configuration = new Configuration();
			configuration.configure("hibernateMovilway.cfg.xml");
			logger.info("Hibernate Configuration created successfully-Movilway");

			ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
			logger.info("ServiceRegistry created successfully-Movilway");
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);
			logger.info("SessionFactory created successfully-Movilway");

			servletContextEvent.getServletContext().setAttribute("SessionFactory", sessionFactory);
			logger.info("Hibernate SessionFactory Configured successfully-Movilway");
			try {
				HibernateUtil.setSessionFactory(sessionFactory);
			} catch (InfraestructureException e) {
				e.printStackTrace();
			}
			
		} catch (HibernateException e1) {
			e1.printStackTrace();
		}

		

	}

}