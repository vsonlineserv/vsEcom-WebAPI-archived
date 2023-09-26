using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VOnline.VBuy.Persistence.Entity
{
  public class SellerCategory
    {
      [Key]
      public int Id { get; set; }
      [ForeignKey("seller")]
      public virtual SellerBranch BranchId { get; set; }
      public int Category { get; set; }
    }
}
