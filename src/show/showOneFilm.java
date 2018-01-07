package show;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import Domain.Film;
import Repository.FilmDAO;

import java.util.*;

@WebServlet("/show-film")
public class showOneFilm extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
      throws ServletException, IOException {
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    System.out.println("ShowFilm");
    String filmID = request.getParameter("filmID");
    FilmDAO filmDAO = new FilmDAO();
    int ID = Integer.parseInt(filmID);
    Film film = filmDAO.getFilmByID(ID);
    List<Film> films = new ArrayList<Film>(); films.add(film);
    request.setAttribute("films", films);
    String format = request.getParameter("format");
    String outputPage;
    if ("xml".equals(format)) {
      response.setContentType("text/xml");
      outputPage = "/WEB-INF/results/films-xml.jsp";
    } else if ("json".equals(format)) {
      response.setContentType("application/json");
      outputPage = "/WEB-INF/results/oneFilm-json.jsp";
    } else {
      response.setContentType("text/plain");
      outputPage = "/WEB-INF/results/oneFilm-string.jsp";
    }
    RequestDispatcher dispatcher =
      request.getRequestDispatcher(outputPage);
    dispatcher.include(request, response);
  }

  public void doPost(HttpServletRequest request,
                     HttpServletResponse response)
      throws ServletException, IOException {
    doGet(request, response);
  }
 }