////////////////////////////////////////////////////////////////////////////////////////////
// <copyright>
// Copyright (c) 2014-2020 VS Online Services Pvt ltd, All Rights Reserved
// </copyright>
// <description>VSECommerce: A VBuy.in platform<description>
// <author>Sivakumar Anirudhan</author>
//VSOnline.VSECommerce.Domain ResultSet
///////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace VSOnline.VSECommerce.Domain
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> AsQueryable();

        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath, Expression<Func<T, object>> includePaths2);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath, Expression<Func<T, object>> includePaths2, Expression<Func<T, object>> includePaths3);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includePath, Expression<Func<T, object>> includePaths2, Expression<Func<T, object>> includePaths3, Expression<Func<T, object>> includePaths4);
        T Single(Expression<Func<T, bool>> predicate);
        T SingleOrDefault(Expression<Func<T, bool>> predicate);
        T First(Expression<Func<T, bool>> predicate);
        T GetById(int id);

        void Add(T entity);
        void Delete(T entity);
        void Attach(T entity);       
    }
}
