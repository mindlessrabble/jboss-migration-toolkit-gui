package com.jboss.windup.gui.util;

import com.jboss.windup.gui.util.Loggable;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import java.lang.Exception;
import javax.interceptor.AroundInvoke;
import org.apache.logging.log4j.Logger;

@Loggable
@Interceptor
public class LoggingInterceptor
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