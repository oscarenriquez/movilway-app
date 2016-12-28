package movilway.service;

import java.util.List;

import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface CampanaDetalleService<T> extends GenericService<T>  {

	List<CampanaDetalle> getListaCampanaDetalleByAgente(Long agenteId, String estatus) throws InfraestructureException;
}
