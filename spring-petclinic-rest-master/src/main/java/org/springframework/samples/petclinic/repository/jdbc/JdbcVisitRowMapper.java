package org.springframework.samples.petclinic.repository.jdbc;


import org.springframework.jdbc.core.RowMapper;
import org.springframework.samples.petclinic.model.Visit;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

class JdbcVisitRowMapper implements RowMapper<Visit> {

    @Override
    public Visit mapRow(ResultSet rs, int row) throws SQLException {
        Visit visit = new Visit();
        visit.setId(rs.getInt("visit_id"));
        Date visitDate = rs.getDate("visit_date");
        visit.setDate(new Date(visitDate.getTime()));
        visit.setDescription(rs.getString("description"));
        return visit;
    }
}
