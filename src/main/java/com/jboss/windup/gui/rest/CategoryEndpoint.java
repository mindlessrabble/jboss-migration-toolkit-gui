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
import com.jboss.windup.gui.model.Category;

/**
 * 
 */
@Stateless
@Path("/categories")
public class CategoryEndpoint
{
   @PersistenceContext(unitName = "applicationPetstorePU")
   private EntityManager em;

   @POST
   @Consumes({ "application/xml", "application/json" })
   public Response create(Category entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(CategoryEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Category entity = em.find(Category.class, id);
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
      TypedQuery<Category> findByIdQuery = em.createQuery("SELECT DISTINCT c FROM Category c WHERE c.id = :entityId ORDER BY c.id", Category.class);
      findByIdQuery.setParameter("entityId", id);
      Category entity;
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
   public List<Category> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<Category> findAllQuery = em.createQuery("SELECT DISTINCT c FROM Category c ORDER BY c.id", Category.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<Category> results = findAllQuery.getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes({ "application/xml", "application/json" })
   public Response update(@PathParam("id") Long id, Category entity)
   {
      if (entity == null)
      {
         return Response.status(Status.BAD_REQUEST).build();
      }
      if (!id.equals(entity.getId()))
      {
         return Response.status(Status.CONFLICT).entity(entity).build();
      }
      if (em.find(Category.class, id) == null)
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
