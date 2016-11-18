package movilway.service.impl;

import movilway.service.ArchivoSaldosService;
import movilway.dao.ArchivoSaldosDao;
import movilway.dao.domain.ArchivoSaldos;
import movilway.dao.impl.ArchivoSaldosDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.util.GenericServiceImpl;

public class ArchivoSaldosServiceImpl<T> extends GenericServiceImpl<T> implements ArchivoSaldosService<T> {	

	private static ArchivoSaldosService<ArchivoSaldos> service;
	private ArchivoSaldosDao<ArchivoSaldos> dao;
	
	@SuppressWarnings("unchecked")
	private ArchivoSaldosServiceImpl(){
		dao = ArchivoSaldosDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final ArchivoSaldosService<ArchivoSaldos> getInstance(){		
		if(service == null) {
			synchronized (service) {
				if(service == null) {
					service = new ArchivoSaldosServiceImpl<>();
				}
			}
		}		
		return service;
	}
}
