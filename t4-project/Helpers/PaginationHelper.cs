using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace t4_project.Helpers

{
    public class PaginationHelper<T>
    {
        public List<T> Items { get; private set; }
        public int CurrentPage { get; private set; }
        public int TotalPages { get; private set; }
        public int TotalCount { get; private set; }

        public PaginationHelper(List<T> items, int count, int page, int pageSize)
        {
            Items = items;
            TotalCount = count;
            CurrentPage = page;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }

        public static async Task<PaginationHelper<T>> CreateAsync(IQueryable<T> source, int page, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PaginationHelper<T>(items, count, page, pageSize);
        }

        public bool HasPreviousPage => CurrentPage > 1;
        public bool HasNextPage => CurrentPage < TotalPages;

        public IEnumerable<object> GetPageSeries(int window = 2)
        {
            if (TotalPages <= 1) yield break;

            int left = Math.Max(1, CurrentPage - window);
            int right = Math.Min(TotalPages, CurrentPage + window);

            if (left > 1)
            {
                yield return 1;
                if (left > 2) yield return ":gap";
            }

            for (int i = left; i <= right; i++)
                yield return i;

            if (right < TotalPages)
            {
                if (right < TotalPages - 1) yield return ":gap";
                yield return TotalPages;
            }
        }
    }
}
