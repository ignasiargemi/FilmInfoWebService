<%@ page import="java.util.List" %>
<%@ page import="Domain.Film" %>

<%
List<Film> films = (List<Film>) request.getAttribute("films");
Film oneFilm = null;
out.println("id#title#year#director#duration#credits#review");
for (int i=0; i<films.size();i++){
	oneFilm = films.get(i);
	out.println(oneFilm.getId() + "#" + oneFilm.getTitle() + "#" +oneFilm.getYear() + "#" +oneFilm.getDirector() 
	+ "#" +oneFilm.getDuration() + "#" +oneFilm.getCredits() + "#" +oneFilm.getReview());	
}

%>