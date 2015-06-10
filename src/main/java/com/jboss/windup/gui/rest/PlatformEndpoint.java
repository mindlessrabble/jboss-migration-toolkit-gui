package com.jboss.windup.gui.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.jboss.windup.gui.model.Platform;

/**
 * 
 */
@Stateless
@Path("/platforms")
public class PlatformEndpoint
{
   @PersistenceContext(unitName = "applicationPetstorePU")
   private EntityManager em;

   @POST
   @Consumes({ "application/xml", "application/json" })
   public Response create(Platform entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(PlatformEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Platform entity = em.find(Platform.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces({ "application/xml", "application/json" })
   public Response findById(@PathParam("id") Long id)
   {
      TypedQuery<Platform> findByIdQuery = em.createQuery("SELECT DISTINCT p FROM Platform p LEFT JOIN FETCH p.vendor WHERE p.id = :entityId ORDER BY p.id", Platform.class);
      findByIdQuery.setParameter("entityId", id);
      Platform entity;
      try
      {
         entity = findByIdQuery.getSingleResult();
      }
      catch (NoResultException nre)
      {
         entity = null;
      }
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      return Response.ok(entity).build();
   }

   @GET
   @Produces({ "application/xml", "application/json" })
   public List<Platform> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<Platform> findAllQuery = em.createQuery("SELECT DISTINCT p FROM Platform p LEFT JOIN FETCH p.vendor ORDER BY p.id", Platform.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<Platform> results = findAllQuery.getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes({ "application/xml", "application/json" })
   public Response update(@PathParam("id") Long id, Platform entity)
   {
      if (entity == null)
      {
         return Response.status(Status.BAD_REQUEST).build();
      }
      if (!id.equals(entity.getId()))
      {
         return Response.status(Status.CONFLICT).entity(entity).build();
      }
      if (em.find(Platform.class, id) == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      try
      {
         entity = em.merge(entity);
      }
      catch (OptimisticLockException e)
      {
         return Response.status(Response.Status.CONFLICT).entity(e.getEntity()).build();
      }

      return Response.noContent().build();
   }
}
