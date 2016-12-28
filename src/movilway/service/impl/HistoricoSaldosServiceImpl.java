package movilway.service.impl;

import movilway.dao.HistoricoSaldosDao;
import movilway.dao.domain.HistoricoSaldos;
import movilway.dao.impl.HistoricoSaldosDaoHibernateImpl;
import movilway.dao.util.GenericDao;
import movilway.service.HistoricoSaldosService;
import movilway.service.util.GenericServiceImpl;

public class HistoricoSaldosServiceImpl<T> extends GenericServiceImpl<T> implements HistoricoSaldosService<T> {

	private static HistoricoSaldosService<HistoricoSaldos> service;
	private HistoricoSaldosDao<HistoricoSaldos> dao;
	
	@SuppressWarnings("unchecked")
	private HistoricoSaldosServiceImpl(){
		dao = HistoricoSaldosDaoHibernateImpl.getInstance();
		genericDao =  (GenericDao<T>) dao;
	}
	
	public static final HistoricoSaldosService<HistoricoSaldos> getInstance(){
		if(service == null) {
			service = new HistoricoSaldosServiceImpl<>();
		}				
		return service;
	}
}
