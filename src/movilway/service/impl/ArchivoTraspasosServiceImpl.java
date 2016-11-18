package movilway.service.impl;

import movilway.service.ArchivoTraspasosService;
import movilway.service.util.GenericServiceImpl;
import movilway.dao.ArchivoTraspasosDao;
import movilway.dao.domain.ArchivoTraspasos;
import movilway.dao.impl.ArchivoTraspasosDaoHibernateImpl;
import movilway.dao.util.GenericDao;

public class ArchivoTraspasosServiceImpl<T> extends GenericServiceImpl<T> implements ArchivoTraspasosService<T> {
	
	private static ArchivoTraspasosService<ArchivoTraspasos> service;
	private ArchivoTraspasosDao<ArchivoTraspasos> dao;

	@SuppressWarnings("unchecked")
	private ArchivoTraspasosServiceImpl(){
		dao = ArchivoTraspasosDaoHibernateImpl.getInstance();
		genericDao = (GenericDao<T>) dao;
	}
	
	public static final ArchivoTraspasosService<ArchivoTraspasos> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new ArchivoTraspasosServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
