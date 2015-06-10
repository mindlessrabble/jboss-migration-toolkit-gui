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
import com.jboss.windup.gui.model.Technology;
import javax.persistence.ManyToOne;

@Entity
@Table(name = "TECHVERS")
public class TechnologyVersion implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(length = 10, nullable = false)
   private String techVersion;

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
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof TechnologyVersion))
      {
         return false;
      }
      TechnologyVersion other = (TechnologyVersion) obj;
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

   public String getTechVersion()
   {
      return techVersion;
   }

   public void setTechVersion(String techVersion)
   {
      this.techVersion = techVersion;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (techVersion != null && !techVersion.trim().isEmpty())
         result += "techVersion: " + techVersion;
      return result;
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