package com.jboss.windup.gui.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import com.jboss.windup.gui.model.Application;
import javax.persistence.ManyToOne;
import com.jboss.windup.gui.model.Technology;

@Entity
@Table(name = "tech_used_by_app")
public class TechnologyUsedByApplication implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @ManyToOne
   private Application application;

   @ManyToOne
   private Technology technology;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (id != null)
         result += "id: " + id;
      return result;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof TechnologyUsedByApplication))
      {
         return false;
      }
      TechnologyUsedByApplication other = (TechnologyUsedByApplication) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public Application getApplication()
   {
      return this.application;
   }

   public void setApplication(final Application application)
   {
      this.application = application;
   }

   public Technology getTechnology()
   {
      return this.technology;
   }

   public void setTechnology(final Technology technology)
   {
      this.technology = technology;
   }
}