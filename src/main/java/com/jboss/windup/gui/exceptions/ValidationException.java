package com.jboss.windup.gui.exceptions;

import java.lang.RuntimeException;

public class ValidationException extends RuntimeException
{

   public ValidationException()
   {
      super();
   }

   public ValidationException(String message)
   {
      super(message);
   }
}