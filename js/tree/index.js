$(function(){
    init('#tree_example', data)
})
var data = [
    {
        value: '1',
        label: '1',
        children: [
            {
                value: '1-1',
                label: '1-1'
            },
            {
                value: '1-2',
                label: '1-2'
            },
            {
                value: '1-3',
                label: '1-3'
            }
        ]
    },
    {
        value: '2',
        label: '2',
        children: [
            {
                value: '2-1',
                label: '2-1'
            },
            {
                value: '2-2',
                label: '2-2'
            }
        ]
    },
    {
        value: '3',
        label: '3',
        children: [
            {
                value: '3-1',
                label: '3-1'
            },
            {
                value: '3-2',
                label: '3-2'
            }
        ]
    }
]
var $tree_node_canexpand_template = '<div class="tree_node">\
    <i class="tree_toggle"></i>\
    <span class="tree_check"></span>\
    <span class="tree_label">{label}</span>\
</div>'
var $tree_node_template = '<div class="tree_node">\
    <span class="tree_check"></span>\
    <span class="tree_label">{label}</span>\
</div>'
var $tree_list_template = '<div class="tree_list" data-h="{height}">{child}</div>'
var $tree_root_template = '<div class="tree_list tree_root">{child}</div>'
var tree_item_height = 21 // 当个tree_item的高度
function renderTreeHtml(data) {
    var list = ''
    $.each(data, function (index, item) {
        var $tree_list = ''
        if (typeof item.children !== 'undefined') {
            var treelist = renderTreeHtml(item.children)
            $tree_list = $tree_list_template.replace(/{child}/, treelist.list).replace(/{height}/, treelist.num * tree_item_height)
            var $tree_node = $tree_node_canexpand_template.replace(/{label}/, item.label)
            $tree_child = '<div class="tree_item">' + $tree_node + $tree_list + '</div>'
            list += $tree_child
        } else {
            var $tree_node = $tree_node_template.replace(/{label}/, item.label)
            $tree_child = '<div class="tree_item">' + $tree_node + $tree_list + '</div>'
            list += $tree_child
        }
    })
    return {list: list, num: data.length}
}

function init(el, data) {
    $el = $(el)
    $el.html($tree_root_template.replace(/{child}/, renderTreeHtml(data).list))

    $el.on('click', function(e) {
        $target = $(e.target)
        if ($target.hasClass('tree_toggle')) {
            if ($target.hasClass('is_expand')) {
                // 处理展开收缩按钮
                $target.removeClass('is_expand')
                // 处理列表展开收缩
                $target.parents('.tree_node:eq(0)').siblings('.tree_list').animate({
                    height: 0,
                    opacity: 0
                }, 500)    
            } else {
                $target.addClass('is_expand')
                $target.parents('.tree_node:eq(0)').siblings('.tree_list').animate({
                    height: $target.parents('.tree_node:eq(0)').siblings('.tree_list').data('h'),
                    opacity: 1
                }, 500) 
            }
        }
    })  
}