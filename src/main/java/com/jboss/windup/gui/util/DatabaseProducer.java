package com.jboss.windup.gui.util;

import javax.persistence.EntityManager;
import javax.enterprise.inject.Produces;
import javax.persistence.PersistenceContext;

public class DatabaseProducer
{

   @Produces
   @PersistenceContext
   private EntityManager em;
}