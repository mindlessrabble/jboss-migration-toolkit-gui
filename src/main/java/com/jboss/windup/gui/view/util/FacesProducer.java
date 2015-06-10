package com.jboss.windup.gui.view.util;

import javax.faces.context.FacesContext;
import javax.enterprise.inject.Produces;

public class FacesProducer
{

   @Produces
   private FacesContext facesContext;
}