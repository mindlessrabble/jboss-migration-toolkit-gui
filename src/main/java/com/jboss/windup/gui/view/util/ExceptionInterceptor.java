package com.jboss.windup.gui.view.util;

import com.jboss.windup.gui.view.util.CatchException;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import java.lang.Exception;
import javax.interceptor.AroundInvoke;
import org.apache.logging.log4j.Logger;

@CatchException
@Interceptor
public class ExceptionInterceptor
{

   private Logger logger;

   @AroundInvoke
   private Object intercept(InvocationContext ic) throws Exception
   {
      try
      {
         return ic.proceed();
      }
      finally
      {
      }
   }
}