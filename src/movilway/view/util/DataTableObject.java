package movilway.view.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.PropertyResourceBundle;

public class DataTableObject implements Serializable {

	private static final long serialVersionUID = 4798771797273778562L;
	
	private int iTotalRecords;
	private int iTotalDisplayRecords;
	private String[] sColumns;
	private String dir;
	private String sSearch;
	private String searchSQL;
	private String sortDir;
	private String sort;
	
	
	private int amount;
	private int start;
	private int echo;
	private int col;
	
	private PropertyResourceBundle bundle;

	
	public DataTableObject() {
		super();
		dir = "desc";
		sSearch = "";
		searchSQL = "";
		sortDir = "";
		amount = 10;
		start = 0;
		echo = 0;
		col = 0;
	}
	

	public DataTableObject(int iTotalRecords, int iTotalDisplayRecords,	String sEcho, String[] sColumns, List<Object> aaData) {
		super();
		this.iTotalRecords = iTotalRecords;
		this.iTotalDisplayRecords = iTotalDisplayRecords;
		this.sColumns = sColumns;
		dir = "desc";
		sSearch = "";
		searchSQL = "";
		sortDir = "";
		amount = 10;
		start = 0;
		echo = 0;
		col = 0;
	}
	
	public PropertyResourceBundle getBundle(){
		if(bundle == null){
			bundle = (PropertyResourceBundle) PropertyResourceBundle.getBundle("applicationDashP");
		}
		return bundle;
	}


	public String getsSearch() {
		return sSearch;
	}

	public void setsSearch(String sSearch) {
		this.sSearch = sSearch;
	}

	public void setSortDir(String sortDir) {
		this.sortDir = sortDir;
	}

	public int getiTotalRecords() {
		return iTotalRecords;
	}


	public void setiTotalRecords(int iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}


	public int getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}


	public void setiTotalDisplayRecords(int iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}


	public String[] getsColumns() {
		return sColumns;
	}


	public void setsColumns(String[] sColumns) {
		this.sColumns = sColumns;
	}


	public String getDir() {
		return dir;
	}


	public void setDir(String dir) {
		this.dir = dir;
	}


	public String getSearchSQL() {
		return searchSQL;
	}


	public void setSearchSQL(String searchSQL) {
		this.searchSQL = searchSQL;
	}


	public String getSortDir() {
		return sortDir;
	}


	public void setSortDirr(String sortDir) {
		this.sortDir = sortDir;
	}


	public int getAmount() {
		return amount;
	}


	public void setAmount(int amount) {
		this.amount = amount;
	}


	public int getStart() {
		return start;
	}


	public void setStart(int start) {
		this.start = start;
	}


	public int getEcho() {
		return echo;
	}


	public void setEcho(int echo) {
		this.echo = echo;
	}


	public int getCol() {
		return col;
	}


	public void setCol(int col) {
		this.col = col;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public void processDataTable(String sStart,	String sAmount,	String sEcho, String sCol, String sdir, String searchTerm){
		if (sStart != null && !sStart.isEmpty()) {
			start = Integer.parseInt(sStart);
			if (start < 0)
				start = 0;
		}
		if (sAmount != null && !sAmount.isEmpty()) {
			amount = Integer.parseInt(sAmount);
			if (amount < 10 || amount > 100)
				amount = 10;
		}
		if (sEcho != null && !sEcho.isEmpty()) {
			echo = Integer.parseInt(sEcho);
		}
		
		if (sCol != null && !sCol.isEmpty()) {
			col = Integer.parseInt(sCol);
			
			if (col < 0 || col > 10)
				col = 0;
		}
		if (sdir != null && !sdir.isEmpty()) {
			if (!sdir.equals("asc"))
				dir = "asc ";
		}
		if (sdir != null && !sdir.isEmpty()) {
			if (!sdir.equals("desc"))
				dir = "desc ";
		}
		if (searchTerm != null){
			sSearch =  searchTerm;
		}
		
		String colName = getsColumns()[col];
		
		sortDir = " order by " + colName + " " + dir;
		
		sort = " " + colName + " " + dir;
		
	}		

	public List<?> paginatedTable(List<?> list){
		int endList = this.getStart() + this.getAmount();
		int amount = (endList > list.size() ? list.size() : endList);
		
		@SuppressWarnings("rawtypes")
		List<?> listResult = new ArrayList();
		
		listResult = list.subList(this.getStart(), amount);
		return listResult;
	}
	
	public <T> List<T> paginatedTableGeneric(List<T> list){
		int endList = this.getStart() + this.getAmount();
		int amount = (endList > list.size() ? list.size() : endList);
		
		return list.subList(this.getStart(), amount);
	}
	
}
