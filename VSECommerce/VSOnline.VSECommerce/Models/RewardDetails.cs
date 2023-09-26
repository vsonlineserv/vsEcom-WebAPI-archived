using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VSOnline.VSECommerce.Models
{

    public class RewardDetails
    {
        public Int32 TotalReward { get; set; }
        public Int32 Redeemed { get; set; }
        public Int32 AdminReduced { get; set; }
        public Int32 Transferred { get; set; }
        public Int32 Balance { get; set; }
        public Int32 ExpiredBalance { get; set; }
        public Int32 ValidBalance { get; set; }
        public ApiResult apiResult { get; set; }
    }

    public class RewardDiscount
    {
        public int discountAmount { get; set; }
        public ApiResult apiResult { get; set; }
    }
}