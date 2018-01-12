package Domain;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name = "filmlist")
@XmlAccessorType (XmlAccessType.FIELD)

/**
 * Assistant class to ease the data transfer between elements of the MVC
 */
public class FilmList {
	public FilmList() {}
	
	@XmlElement(name="film")	
	private List<Film> films;
	public FilmList(List<Film> inFilms){
		films=inFilms;
	}
	public List<Film> getFilmList(){
		return films;
	}
	public void setFilmList(List<Film> inFilms){
		films=inFilms;
	}
}
