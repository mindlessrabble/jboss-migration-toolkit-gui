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
import com.jboss.windup.gui.model.Platform;

@Entity
@Table(name = "RULE")
public class Rule implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column
   private String ruleId;

   @Column
   private String description;

   @ManyToOne
   private Technology technology;

   @ManyToOne
   private Platform platform;

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
      if (!(obj instanceof Rule))
      {
         return false;
      }
      Rule other = (Rule) obj;
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

   public String getRuleId()
   {
      return ruleId;
   }

   public void setRuleId(String ruleId)
   {
      this.ruleId = ruleId;
   }

   public String getDescription()
   {
      return description;
   }

   public void setDescription(String description)
   {
      this.description = description;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (ruleId != null && !ruleId.trim().isEmpty())
         result += "ruleId: " + ruleId;
      if (description != null && !description.trim().isEmpty())
         result += ", description: " + description;
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

   public Platform getPlatform()
   {
      return this.platform;
   }

   public void setPlatform(final Platform platform)
   {
      this.platform = platform;
   }
}