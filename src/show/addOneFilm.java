package show;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Domain.Film;
import Repository.FilmDAO;

/**
 * Web Servlet to add a film from the DB
 */
@WebServlet("/add-film")
public class addOneFilm extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
      throws ServletException, IOException {
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    System.out.println("Add film");
    FilmDAO filmDAO = new FilmDAO();
    
    String filmTitle = request.getParameter("name");
    String filmYear = request.getParameter("year");
    String filmDirector = request.getParameter("director");
    String filmDuration = request.getParameter("duration");
    String filmCredits = request.getParameter("credits");
    String filmReview = request.getParameter("review");
    String outputMessage = "";
    try {
		int year = Integer.parseInt(filmYear);
		int duration = Integer.parseInt(filmDuration);
		Film film = new Film(filmTitle,year, filmDirector,duration, filmCredits, filmReview);
		
		int ID = filmDAO.addFilm(film);
		outputMessage = "" + ID;
    }
    catch (Exception e) {
    	outputMessage = "Something went wrong! Maybe there is an uncorrect parametre.";
    	System.out.println(e);
    }

    request.setAttribute("newID", outputMessage);
    String format = request.getParameter("format");
    String outputPage = "/WEB-INF/results/addNewID.jsp";
    response.setContentType("text/plain");
    
    RequestDispatcher dispatcher =
      request.getRequestDispatcher(outputPage);
    dispatcher.include(request, response);
    System.out.println("FILM ADDED");
  }
  
  public void doPost(HttpServletRequest request,
	          HttpServletResponse response)
	throws ServletException, IOException {
	doGet(request, response);
	}
}